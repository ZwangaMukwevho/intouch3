// Loading Spinner
import { Oval } from "react-loader-spinner";

export default function SpinnerLoader(props) {
  return props.bool ? (
    <Oval
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  ) : null;
}
