import React from "react";
import "./page.css";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function page() {
  return (
    <>
      <div className="maindiv">
        <div className="header">
          <h1>Student Wise Analysis</h1>
          <br></br>
          <form className="form-style">
            <label>Name: </label>
            <Input placeholder="Enter your Full Name..." />
            <label>Select: </label>
            <Select className="select-uniid">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GNR">GNR</SelectItem>
                <SelectItem value="PRN">PRN</SelectItem>
              </SelectContent>
            </Select>
            <label>Id: </label>
            <Input placeholder="Enter your GNR or PRN..." />
          </form>
        </div>
      </div>
      <div className="footer">Footer Section</div>
    </>
  );
}

export default page;
