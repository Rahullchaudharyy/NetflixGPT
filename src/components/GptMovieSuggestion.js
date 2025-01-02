import { useSelector } from "react-redux";

const GptMovieSuggestion = () => {
  const { MovieResult, MovieName } = useSelector(state => state.gpt);
  try {

    if (!MovieResult) {
      return null;
    }

    return (


      <div className='p-8' >
        <h1 className='font-bold text-3xl text-white'>{ } </h1>
        <div className='flex overflow-x-scroll' id='GPT-DIV'>

          <div className='flex gap-6 p-2' >

            {MovieResult?.map((data, index) => (
              <div className='w-[200px] break-words rounded-md ' key={index}>
                <div className="h-[20px] w-full">

                  <h1 className="text-[10px] text-white">{data?.original_title}</h1>
                </div>
                <img
                  alt="poster_path"
                  src={
                    data.poster_path
                      ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
                      : `https://placehold.co/600x900?text=${data.original_title}`
                  }
                />
              </div>
            ))}


          </div>


        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering GptMovieSuggestion:", error);
    return <div>Something went wrong.</div>;
  }
};

export default GptMovieSuggestion;
