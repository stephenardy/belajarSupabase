import supabase from "@/lib/database";
import { IMenu } from "@/types/menu";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Ellipsis } from "lucide-react";

const AdminPage = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("menus").select("*");
      if (error) {
        console.log("error", error);
      } else {
        setMenus(data);
      }
    };

    fetchMenus();
  }, [setMenus]);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <h1 className="text-3xl font-bold">Menu</h1>
        <Button className="font-bold">Add New Menu</Button>
      </div>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.id}>
              <TableCell className="w-full flex gap-3">
                <Image
                  src={menu.image}
                  width={50}
                  height={50}
                  alt={menu.name}
                  className="aspect-square object-cover rounded-lg"
                />
                {menu.name}
              </TableCell>
              <TableCell>{menu.category}</TableCell>
              <TableCell>$ {menu.price}.00</TableCell>
              <TableCell>
                {menu.description.split(" ").slice(0, 5).join(" ") + "..."}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="font-bold">
                      Action
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPage;
