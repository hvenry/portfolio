import TabsContainer from "@/components/TabsContainer";

export const metadata = {
  title: "Random - henryvendittelli.com",
  description: "Setup, OS, Configs, Software, Books, and more."
};

export default function Page() {
  return (
    <main className="flex flex-col pb-16 sm:h-[calc(var(--vh)_*100-10rem)] sm:pb-0">
      {/* No visible header: the canvas gets the full height for the windows */}
      <h1 className="sr-only">Random</h1>
      <div className="sm:min-h-0 sm:flex-1">
        <TabsContainer />
      </div>
    </main>
  );
}
