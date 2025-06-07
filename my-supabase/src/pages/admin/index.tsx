import supabase from "@/lib/database";
import { IMenu } from "@/types/menu";
import { FormEvent, useEffect, useState } from "react";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Image from "next/image";
import { Ellipsis } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminPage = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const handleAddMenu = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await supabase
        .from("menus")
        .insert(Object.fromEntries(formData))
        .select();
      if (error) console.log("error", error);
      else {
        if (data) {
          setMenus((prev) => [...prev, ...data]);
        }
        toast("New menu submitted");
        setDialogOpen(!dialogOpen);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 w-full flex justify-between">
        <h1 className="text-3xl font-bold">Menu</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold">Add Menu</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddMenu}>
              <DialogHeader>
                <DialogTitle>Add New Menu</DialogTitle>
                <DialogDescription>Input the menu details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Menu Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Input menu name"
                    required
                  ></Input>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    placeholder="Input menu price"
                    required
                  ></Input>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="pastry">Pastry</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="resize-none"
                    required
                  ></Textarea>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    name="image"
                    type="text"
                    placeholder="Input Image URL"
                    required
                  ></Input>
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
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
