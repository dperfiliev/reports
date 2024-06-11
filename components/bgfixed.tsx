import Image from "next/image"

export default function BgFixed(){
    return(
        <div className="absolute w-screen h-screen">
            <div className="mx-auto w-full h-full relative flex justify-center items-center">
                <div className="mx-auto fixed hidden lg:block h-[30vw] w-[30vw]">
                    <Image src="/images/bg.png" alt="" fill sizes="50vw" className="bg-no-repeat bg-center" priority={true} />
                </div>
            </div>
        </div>
    )
}
