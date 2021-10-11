Uses ts-jest but really doesn't need to.

ts-jest makes use of TS, but Next **can't** because it's so in love with Babel. So you have to use Babel for your Jest tests. bleh