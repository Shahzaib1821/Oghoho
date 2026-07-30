import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="font-editorial mt-6 text-5xl text-foreground">This page has not yet bloomed.</h1>
        <p className="mt-4 text-sm text-muted-foreground">The path you followed does not exist here.</p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center gap-2 border-b border-terracotta pb-1 text-sm tracking-wide text-terracotta">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-editorial text-3xl text-foreground">Something interrupted the page.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Take a breath. Try again.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border-b border-terracotta pb-1 text-sm tracking-wide text-terracotta"
          >Try again</button>
          <a href="/" className="border-b border-foreground/40 pb-1 text-sm tracking-wide text-foreground">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
