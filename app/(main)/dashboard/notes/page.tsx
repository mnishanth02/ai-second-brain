import React from "react";

import { Card, CardContent } from "@/components/ui/card";

const NotesPage = () => {
  return (
    <Card className="flex h-[calc(100vh-200px)] items-center justify-center">
      <CardContent>
        <p className="text-center text-xl font-semibold text-muted-foreground">
          Select a note or create a new one to get started
        </p>
      </CardContent>
    </Card>
  );
};

export default NotesPage;
