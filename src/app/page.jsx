import Image from "next/image";
import Link from "next/link";
import ProductId from "./products/[productId]/page";
export default async function Home() {
  const res = await fetch("http://localhost:5000/latest-products");
  const datas = await res.json();
  console.log({ datas });
  const featured = datas && datas.length ? datas[0] : null;

  return (
    <div className=" w-7xl mx-auto  py-10">
      {/* banner */}
      <section
        aria-label="Featured product hero"
        className={`relative overflow-hidden rounded-b-2xl shadow-md`}
      >
        {/* background image (if available) */}
        <div
          className={`h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] w-full bg-gray-100`}
          style={
            featured && featured.image
              ? {
                  backgroundImage: `linear-gradient(rgba(3,7,18,0.45), rgba(3,7,18,0.25)), url(${featured.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          {/* overlay */}
          <div className="w-full h-full flex items-center">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
                  {featured?.title ?? "Discover our latest arrivals"}
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90">
                  {featured?.short_description ??
                    "Handpicked products — quality guaranteed. Browse new arrivals and grab special prices today."}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href={
                      featured ? `/products/${featured.productId}` : "/products"
                    }
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-amber-500 text-white font-semibold shadow-md hover:bg-amber-600 transition"
                  >
                    Shop Now
                  </Link>

                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 bg-white/90 text-amber-600 font-semibold shadow-sm hover:bg-white transition"
                    aria-label="Browse all products"
                  >
                    Browse all products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* If you want a product image card on the right side (desktop), we can show it */}
        {featured && (
          <div className="hidden md:block absolute right-8 bottom-6">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border border-white/30 shadow-xl bg-white/5">
              {/* use normal img for background-smoothness; Next/Image may require domains config */}
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </section>
      <div className="grid md:grid-cols-2 py-10  gap-10 w-4xl mx-auto text-white">
        {datas.map((data) => (
          <>
            <div className="hover:shadow-2xl bg-white text-black rounded">
              <div className="card shadow-sm">
                <figure>
                  <img
                    src={data.image}
                    className="w-full h-[300px]"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-2xl">{data.title}</h2>
                  <p>{data.short_description}</p>
                  <div className="card-actions justify-end">
                    <p>
                      Price: <strong className="text-md">{data.price}</strong>
                    </p>
                    <Link
                      href={`/products/${data._id}`}
                      className="btn btn-primary"
                    >
                      Product Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* chose section */}
      <div>
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
              Why Choose Us?
            </h2>

            <div className="grid  md:grid-cols-4 gap-8">
              {[
                {
                  title: "Best Quality",
                  desc: "We ensure premium quality products.",
                },
                {
                  title: "Fast Delivery",
                  desc: "Quick and reliable shipping service.",
                },
                {
                  title: "Secure Payment",
                  desc: "Your transactions are safe with us.",
                },
                {
                  title: "24/7 Support",
                  desc: "We are always here to help.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-gray-800 rounded-xl">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm mt-2 text-gray-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* section 2 */}
      <div className="py-10">
        <section className="py-14 bg-gray-50">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
              Product Categories
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                "Electronics",
                "Fashion",
                "Home Appliances",
                "Bags & Accessories",
              ].map((cat, i) => (
                <div
                  key={i}
                  className="p-6 bg-white shadow-sm rounded-xl border text-center hover:shadow-md hover:border-amber-400 transition"
                >
                  <p className="font-medium text-gray-700">{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* testimials */}
      <div>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
              What Our Customers Say
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Mahid Hasan",
                  role: "Verified Buyer",
                  review:
                    "Amazing product quality! The delivery was extremely fast and the support team was very helpful.",
                  img: "https://i.pravatar.cc/150?img=1",
                },
                {
                  name: "Nusrat Jahan",
                  role: "Regular Customer",
                  review:
                    "I love the overall service. The price is fair, and the products always match the description.",
                  img: "https://i.pravatar.cc/150?img=2",
                },
                {
                  name: "Arman Siddique",
                  role: "Premium Member",
                  review:
                    "Best online shopping experience ever. I highly recommend it to everyone!",
                  img: "https://i.pravatar.cc/150?img=3",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={t.img}
                      className="w-14 h-14 rounded-full object-cover border"
                      alt={t.name}
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    “{t.review}”
                  </p>

                  <div className="mt-4 flex text-amber-500">
                    <span>⭐️⭐️⭐️⭐️⭐️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
