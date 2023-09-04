import Link from "next/link";
import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";
const FooterRender = ({ footList }: { footList: string[] }) => {
  return (
    <div className="flex flex-wrap w-full gap-2 text-xs font-medium text-gray-400">
      {footList.map((item) => {
        return (
          <Link key={item} href={item}>
            <span className="cursor-pointer rounded-md hover:bg-gray-100 ">
              {item}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
function Footer() {
  return (
    <div className="hidden md:flex flex-col w-full gap-2">
      <FooterRender footList={footerList1} />
      <FooterRender footList={footerList2} />
      <FooterRender footList={footerList3} />
    </div>
  );
}

export default Footer;
