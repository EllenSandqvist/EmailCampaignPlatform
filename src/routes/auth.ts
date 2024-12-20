// login and logout routes
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

// login route that uses passport.js with our local strategy

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: Express.User | false) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'invalid email or password' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log(req.session);
      res.json({
        loggedIn: true,
        username: user.name,
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  if (!req.isAuthenticated) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.status(200).json({ loggedOut: true });
  });
});

export { router };
