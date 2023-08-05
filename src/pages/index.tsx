import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>MeteOro</title>
        <meta
          name="description"
          content="MeteOro - NOI Hackathon Summer 2023"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-4 lg:px-8">
          <div className="max-w-xl  lg:col-span-7">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Where do you live?
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-500">
              {"Don't worry, we won't come to your house."}
              <br />
              {
                "We just need to know where you live so we can give you the best energy production forecast."
              }
            </p>
            <form
              className="mt-10 max-w-md"
              onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-x-4">
                <label htmlFor="location" className="sr-only">
                  Email address
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="street-address"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 placeholder-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your address"
                />
                <Link href="/graph">
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                    Show me the results!
                  </button>
                </Link>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-900">
                We care about your data. Read our{" "}
                <a
                  href="#"
                  className="font-semibold text-primary-600 hover:text-primary-500">
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
          </div>
          <div className="flex w-full max-w-md flex-col items-center justify-center lg:col-span-5 lg:pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 391.1 280.1"
              className="w-32 fill-gray-900">
              <path d="M244.481 85.59c-2.485-30.284-17.369-58.538-42.616-80.343L195.789 0l-6.076 5.247c-25.248 21.805-40.131 50.059-42.616 80.343H0v9.295c0 55.255 52.809 100.207 117.721 100.207 15.27 0 29.855-2.514 43.256-7.039-13.201 13.351-31.764 39.767-31.764 82.762v9.295h132.658v-9.295c0-42.98-18.571-69.408-31.769-82.763 13.402 4.525 27.988 7.04 43.26 7.04 64.912 0 117.722-44.952 117.722-100.207V85.59H244.481zm-48.939 59.783c-11.134-11.608-18.535-25.749-20.67-41.192h41.341c-2.137 15.443-9.538 29.583-20.671 41.192zm.247-120.439c17.342 17.182 27.765 38.158 30.041 60.407h-60.082c2.276-22.249 12.7-43.225 30.041-60.407zM19.23 104.181h136.937c2.172 20.002 11.281 38.308 25.252 53.176-17.241 11.936-39.461 19.145-63.697 19.145-50.845-.001-92.871-31.677-98.492-72.321zM148.144 261.52c2.653-35.588 20.152-55.551 29.743-63.938a76.55 76.55 0 0 1 5.923 5.808c-9.005 13.475-17.315 32.565-18.972 58.131h-16.694zm35.308 0c1.312-17.604 6.261-31.373 12.085-41.82 5.826 10.451 10.779 24.221 12.093 41.82h-24.178zm42.792 0c-1.658-25.558-9.972-44.65-18.978-58.129a76.172 76.172 0 0 1 5.931-5.809c9.589 8.395 27.087 28.375 29.742 63.938h-16.695zm-30.704-72.697c-5.528-5.715-10.219-9.207-12.381-10.685a118.252 118.252 0 0 0 12.383-8.157 118.06 118.06 0 0 0 12.387 8.159c-2.169 1.483-6.862 4.972-12.389 10.683zm77.822-12.322c-24.236 0-46.456-7.209-63.697-19.145 13.971-14.869 23.079-33.174 25.252-53.176h136.937c-5.621 40.645-47.648 72.321-98.492 72.321z" />
            </svg>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">MeteOro</h2>
          </div>
        </div>

        {/* <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate px-6 sm:px-24">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Where do you live?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-500">
              {"Don't worry, we won't come to your house."}
              <br />
              {
                "We just need to know where you live so we can give you the best energy production forecast."
              }
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="location" className="sr-only">
                Email address
              </label>
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="street-address"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                placeholder="Enter your address"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
                Show me the results!
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="max-w-xl lg:max-w-lg">
          
        </div> */}
        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
      </main>
    </>
  );
}
