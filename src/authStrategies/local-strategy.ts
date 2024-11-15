import passport from 'passport';
import prisma from '../db/prisma.js';
import { User as prismaUser } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import { Response, Request, NextFunction } from 'express';
import { comparePassword } from '../utils/bcrypt.js';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      role: string;
      email: string;
    }
  }
}

// Här definerar vi vår strategy för passport, I detta fall använder vi LocalStrategy.
// Vi kan använda oss av flera strategys samtidigt, som tex Oauth med google, facebook, discord osv.
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: username },
      });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      } else if (!comparePassword(password, user.password)) {
        return done(null, false, { message: 'Bad credentials' });
      }

      return done(null, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return done(error);
    }
  })
);

// serializeUser används för att spara vår user id i vår session då vi i detta fall
// kombinerar express-sessions med passport.js
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializeUser använder vi för att hämta vårt user object från vår sparade session.
passport.deserializeUser(async (id: string, done: (err: any, user?: any) => void) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
      },
    });

    if (!user) {
      return done(new Error('User not found'), null);
    }

    done(null, user);
  } catch (error) {
    console.error('Error in deserializeUser:', error);
    done(error, null);
  }
});

export function authorize(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('user from authorize:', req.user);
    console.log('allowed:', allowed);
    const user = req.user as prismaUser | undefined;
    if (req.isAuthenticated() && user && allowed.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'unauthorized' });
    }
  };
}

export default passport;
