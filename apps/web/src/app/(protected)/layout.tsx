import { Header } from "@/components/header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ProtectedLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="flex w-full flex-1 overflow-hidden p-1">
        <ScrollArea className="w-full">
          <main className="mx-auto flex w-full flex-1 flex-col gap-6 px-6 md:px-15">
            {children}
          </main>
        </ScrollArea>
      </div>
    </>
  );
}
