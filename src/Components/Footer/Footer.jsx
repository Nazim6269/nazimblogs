import Social from "../Social/Social";

const Footer = () => {
  return (
    <div className="flex flex-col justify-between items-center py-4 px-24 msm:flex msm:flex-row">
      <div>
        <img src="/blog.webp" alt="" className="hidden xsm:block h-20" />
      </div>
      <Social />
    </div>
  );
};

export default Footer;
