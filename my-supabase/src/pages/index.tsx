import supabase from "@/lib/database";
import { useEffect, useState } from "react";
import type { IMenu } from "@/types/menu";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
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
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <Card key={menu.id}>
            <CardHeader>
              <Image
                src={menu.image}
                width={300}
                height={300}
                alt={menu.name}
                className="w-full h-[30vh] object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{menu.name}</h2>
                  <p>{menu.category}</p>
                </div>
                <p className="font-semibold text-2xl">$ {menu.price}.00</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link className="w-full" href={`/products/${menu.id}`}>
                <Button className="w-full font-bold cursor-pointer" size="lg">
                  Detail Menu
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
