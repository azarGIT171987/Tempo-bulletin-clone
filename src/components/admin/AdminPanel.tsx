import React from "react";
import CsvUploader from "./CsvUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPanel = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <CsvUploader />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
