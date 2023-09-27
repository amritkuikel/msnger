"use client";
import Image from "next/image";
import img from "../../public/bg5.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function LoginRegisterPage({ a, b, c, d, e, f, g, h, i }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const submitHandler = async (payload) => {
    if (a === "CREATE") {
      const value = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      };
      try {
        const { data } = await axios.post("/api/auth/register", value);
        alert(JSON.stringify(data));
        router.push("/login");
      } catch (e) {
        console.log(e);
      }
    } else if (a === "LOGIN") {
      const data = {
        email: payload.email,
        password: payload.password,
      };
      try {
        const value = await axios.post("/api/auth/login", data);
        alert(JSON.stringify(value.data.message));
        router.push("/dashboard");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      <div className="w-screen h-screen relative">
        <Image src={img} alt="bg pic" fill={true} />
      </div>
      <div className="absolute top-0  w-screen items-center h-screen flex flex-col justify-around px-4 pb-4 md:px-16 lg:flex-row">
        <div className="flex-column  text-center lg:text-left">
          <div className="lg:flex  items-center">
            <div className="text-[#fceadb] sm:text-5xl xl:text-7xl md:text-6xl text-5xl 2xl:text-8xl pt-10 font-bold tracking-tight">
              {a}
            </div>
            <div className=" text-[#fceadb] italic xl:text-4xl lg:pt-10 lg:pl-6">
              {b}
            </div>
          </div>
          <div className="text-[#fceadb] sm:text-5xl text-5xl xl:text-7xl md:text-6xl mb-5 font-bold tracking-tight lg:mb-8 2xl:text-8xl">
            {c}
          </div>
          <div className="text-[#fceadb] sm:text-base md:text-lg text-sm px-2 xl:text-2xl">
            {d}
          </div>
        </div>
        <div className=" bg-[#fceadb] rounded  mt-7  w-full ">
          <form
            className="px-4 py-4 lg:py-20"
            onSubmit={handleSubmit((data) => submitHandler(data))}
          >
            <div className="font-bold lg:mb-2 text-base xl:text-xl text-black/60 mb-1 sm:text-lg md:text-xl">
              EMAIL
            </div>
            <input
              {...register("email", {
                required: true,
              })}
              type="email"
              placeholder={errors.email && "Please enter your email"}
              className="px-2 lg:mb-6 bg-[#fceadb] border-2  border-red-300 rounded h-9 w-full mb-2"
            />
            {e && (
              <>
                <div
                  className={`text-base lg:mb-2 font-bold xl:text-xl text-black/60 sm:text-lg mb-1 md:text-xl `}
                >
                  FULL NAME
                </div>
                <input
                  {...register("name", {
                    required: true,
                  })}
                  placeholder={errors.name && "Please enter your name"}
                  type="text"
                  className={`px-2 lg:mb-6 bg-[#fceadb] border-2 border-red-300 rounded h-9 w-full mb-2 ${e}`}
                />
              </>
            )}

            <div className="text-base lg:mb-2 font-bold xl:text-xl sm:text-lg text-black/60 mb-1 md:text-xl">
              PASSWORD
            </div>
            <input
              {...register("password", {
                required: true,
              })}
              placeholder={errors.password && "Please enter a password"}
              type="password"
              className="px-2 lg:mb-6 bg-[#fceadb] border-2 border-red-300 rounded h-9 w-full mb-2 "
            />

            <div className="flex mb-3">
              <input type="checkbox" className="lg:mb-3" />
              <div className="ml-2 lg:mb-3 text-slate-600/70 text-sm md:text-lg xl:text-2xl">
                i concent to receiving emails from this site
              </div>
            </div>
            <button className="bg-yellow-500/50 h-10 lg:mb-8 text-center rounded flex items-center justify-center md:text-lg w-44 text-black/80 mb-4 hover:border-2 hover:bg-[#fceadb] hover:border-[#d9a31b]/80 hover:text-[#d9a31b]/80 text-sm xl:text-xl xl:h-14 xl:w-52">
              {f}
            </button>
            <hr className="border-t-2 border-black/20 mb-2 lg:mb-10" />
            <div className="flex justify-between ">
              <div className="text-black/50  text-sm md:text-lg md:font-bold tracking-tighter">
                {g}
              </div>
              <div className="group flex justify-center items-center border-b-2 border-black/50 pb-1 ">
                <div className="text-black/50 mr-2 md:text-lg md:font-bold text-sm tracking-tighter">
                  <Link href={i}>{h}</Link>
                </div>
                <Image
                  className=" group-hover:scale-150"
                  src="https://uploads-ssl.webflow.com/6471ddcb5282041b072c6552/649702ec6406757e702808c5_ds-arrow-dark.svg"
                  alt="logo"
                  width={8}
                  height={8}
                ></Image>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
