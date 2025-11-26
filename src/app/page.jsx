import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const res = await fetch("http://localhost:5000/latest-products");
  const datas = await res.json();
  const featured = datas && datas.length ? datas[0] : null;

  return (
    <div className="w-full max-w-[1440px] mx-auto py-10 px-4 sm:px-6 lg:px-12">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-b-2xl shadow-md">
        <div
          className={`h-[360px] sm:h-[420px] md:h-[480px] lg:h-[560px] w-full bg-gray-100`}
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
          <div className="w-full h-full flex items-center">
            <div className="max-w-2xl px-4 sm:px-6 lg:px-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
                {featured?.title ?? "Discover our latest arrivals"}
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90">
                {featured?.short_description ??
                  "Handpicked products — quality guaranteed. Browse new arrivals and grab special prices today."}
              </p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href={featured ? `/products/${featured._id}` : "/products"}
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

          {featured && (
            <div className="hidden md:block absolute right-4 lg:right-12 bottom-6">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-xl overflow-hidden border border-white/30 shadow-xl bg-white/5">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-10 text-black">
        {datas.map((data) => (
          <div key={data._id} className="hover:shadow-2xl bg-white rounded-lg overflow-hidden transition-shadow">
            <figure className="h-[220px] sm:h-[260px] md:h-[300px] w-full overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-xl sm:text-2xl font-semibold">{data.title}</h2>
              <p className="text-sm mt-1">{data.short_description}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-md font-bold">Price: {data.price}</span>
                <Link
                  href={`/products/${data._id}`}
                  className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 sm:px-0">
          {[
            { title: "Best Quality", desc: "We ensure premium quality products." },
            { title: "Fast Delivery", desc: "Quick and reliable shipping service." },
            { title: "Secure Payment", desc: "Your transactions are safe with us." },
            { title: "24/7 Support", desc: "We are always here to help." },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-gray-800 rounded-xl">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm mt-2 text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-14 my-20  bg-amber-50 rounded-4xl">
        <h2 className="text-2xl md:text-3xl text-black font-bold mb-8  text-center">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 sm:px-0 ">
          {["Electronics", "Fashion", "Home Appliances", "Bags & Accessories"].map((cat, i) => (
            <div
              key={i}
              className="p-6 bg-white shadow-sm rounded-xl border text-center hover:shadow-md hover:border-amber-400 hover:shadow-2xl transition"
            >
              <p className="font-medium text-gray-700">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 my-20 bg-white rounded-4xl hover:bg-amber-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 hover:shadow-2xl sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-0">
          {[
            {
              name: "Mahid Hasan",
              role: "Verified Buyer",
              review: "Amazing product quality! The delivery was extremely fast and the support team was very helpful.",
              img: "https://i.pravatar.cc/150?img=1",
            },
            {
              name: "Nusrat Jahan",
              role: "Regular Customer",
              review: "I love the overall service. The price is fair, and the products always match the description.",
              img: "https://i.pravatar.cc/150?img=2",
            },
            {
              name: "Arman Siddique",
              role: "Premium Member",
              review: "Best online shopping experience ever. I highly recommend it to everyone!",
              img: "https://i.pravatar.cc/150?img=3",
            },
          ].map((t, i) => (
            <div key={i} className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">“{t.review}”</p>
              <div className="mt-4 flex text-amber-500">
                <span>⭐️⭐️⭐️⭐️⭐️</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
