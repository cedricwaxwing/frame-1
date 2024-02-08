import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
  getFrameMessage,
} from "frames.js/next/server";
import Link from "next/link";
import { DEBUG_HUB_OPTIONS } from "./debug/constants";
import { getTokenUrl } from "frames.js";

type State = {
  active: string;
  total_button_presses: number;
};

const initialState = { active: "1", total_button_presses: 0 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
    fetchHubContext: true,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  // Here: do a server side side effect either sync or async (using await), such as minting an NFT if you want.
  // example: load the users credentials & check they have an NFT

  // Example with satori and sharp:
  // const imageUrl = await
  frameMessage;

  console.log("info: state is:", state);

  if (frameMessage) {
    const {
      isValid,
      buttonIndex,
      inputText,
      castId,
      requesterFid,
      casterFollowsRequester,
      requesterFollowsCaster,
      likedCast,
      recastedCast,
      requesterVerifiedAddresses,
      requesterUserData,
    } = frameMessage;

    console.log("info: frameMessage is:", frameMessage);
  }

  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  // then, when done, return next frame
  return (
    <div className='p-4'>
      frames.js starter kit.{" "}
      <Link href={`/debug?url=${baseUrl}`} className='underline'>
        Debug
      </Link>
      <FrameContainer
        postUrl='/frames'
        state={state}
        previousFrame={previousFrame}>
        {/* <FrameImage src={canvasDataUri} /> */}
        <FrameImage>
          <div tw='w-full h-full p-8 text-indigo-600 bg-indigo-100 font-bold text-center justify-center items-center'>
            {frameMessage?.inputText
              ? `Ok great, you want to fund ${frameMessage.inputText}. I'll find evaluate the best projects in the space. One moment, please.`
              : "Fund public goods like magic ✨"}
          </div>
        </FrameImage>
        <FrameInput text='What would you like to fund?' />
        <FrameButton onClick={dispatch}>
          {state?.active === "1" ? "Get Started ✨" : "Inactive"}
        </FrameButton>
        <FrameButton onClick={dispatch}>
          {state?.active === "2" ? "Active" : "Ignore me"}
        </FrameButton>
        <FrameButton
          mint={getTokenUrl({
            address: "0x060f3edd18c47f59bd23d063bbeb9aa4a8fec6df",
            tokenId: "123",
            chainId: 7777777,
          })}>
          Dont click
        </FrameButton>
        <FrameButton href={`https://blog.polywrap.io/`}>Subscribe</FrameButton>
      </FrameContainer>
    </div>
  );
}
