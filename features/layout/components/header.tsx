import { Breadcrumbs } from "./breadcrumbs";
import { GlobalSearch } from "./global-search";
import { NotificationsMenu } from "./notifications-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center gap-6 px-6">
      <Breadcrumbs />
      <div className="flex-1 flex justify-center">
        <GlobalSearch />
      </div>
      <NotificationsMenu />
    </header>
  );
}