import { NextResponse } from 'next/server';
const fs = require('fs');
const path = require('path');
export async function POST(request) {
  const data = await request.json();
  console.log("Received data for update:", data)

  //now chaange the data obj of data.json file
  const filePath = path.join(process.cwd(), 'public/data', 'data.json');
  const fileData = fs.readFileSync(filePath
  );
  const jsonData = JSON.parse(fileData);
  jsonData.data = data;
  fs.writeFileSync
  (filePath, JSON.stringify(jsonData, null, 2));
  console.log("Data updated successfully!");


  // Simulate saving process (you can add actual saving logic here)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ message: "Edits saved successfully!" });
}
