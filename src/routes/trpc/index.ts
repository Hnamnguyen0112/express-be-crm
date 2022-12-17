import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });
type Context = inferAsyncReturnType<typeof createContext>;

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create();
export const trpcRouter = t.router({
  test: t.procedure.query((req) => ({ req }))
});
