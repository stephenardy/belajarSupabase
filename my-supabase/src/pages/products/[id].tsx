import { Button } from "@/components/ui/button";
import supabase from "@/lib/database";
import { IMenu } from "@/types/menu";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailMenuPage = () => {
  const router = useRouter();
  const [menu, setMenu] = useState<IMenu | null>(null);

  useEffect(() => {
    if (router.query.id) {
      const fetchMenus = async () => {
        const { data, error } = await supabase
          .from("menus")
          .select("*")
          .eq("id", router.query.id)
          .single();

        if (error) {
          console.log("error", error);
        } else {
          setMenu(data);
        }
      };

      fetchMenus();
    } else {
      throw new Error("menu not found!");
    }
  }, [router.query.id]);

  //   console.log(menu);

  return (
    <div className="container mx-auto py-8">
      {menu && (
        <div className="flex gap-16 w-full">
          <Image
            src={menu.image}
            alt={menu.name}
            width={300}
            height={300}
            className="w-full h-[70vh] object-cover"
          ></Image>
          <div>
            <h1 className="text-5xl font-bold mb-4">{menu.name}</h1>
            <p className="text-xl text-neutral-500 mb-4">{menu.description}</p>
            <div className="flex gap-8">
              <p className="font-bold text-4xl">$ {menu.price}.00</p>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMenuPage;
