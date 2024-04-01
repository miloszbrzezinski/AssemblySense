import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelloWidget from "@/components/workspace/hello-widget";
import { SpaceNavbar } from "@/components/workspace/space-navbar";
import Image from "next/image";

export default function ComponentsLibraryPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4">
        <p className="text-4xl font-extralight">Kuka KR1100</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="use_cases">Use cases</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"></TabsContent>
        <TabsContent value="use_cases"></TabsContent>
        <TabsContent value="problems"></TabsContent>
      </Tabs>
    </div>
  );
}
