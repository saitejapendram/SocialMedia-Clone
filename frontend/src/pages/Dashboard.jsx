import { AllPosts } from "../components/AllPosts"

export const Dashboard = () => {
    return (<div className="flex justify-around items-center">
        <div className="flex justify-center  w-96 mt-12">
            <AllPosts />
        </div>
        </div>
    )
}