
type StatusProps = {
    status: number | null;
  };

export default function Message({status}:StatusProps){

    if (status === null) {
        return
    }

    if (status === 200 || 201) {
        return(
            <div className="flex itemes-center rounded-md p-4 justify-center text-white bg-green-600">
            Succes!
            </div>
        )
       
    } else {

        return(
            <div className="flex itemes-center rounded-md p-4 justify-center text-white bg-red-600">
            Oops!! Something went wrong.
            </div>
        )
    }

}