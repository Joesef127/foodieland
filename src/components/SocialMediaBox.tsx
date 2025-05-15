import facebook from "../assets/icons/facebook.svg"
import twitter from "../assets/icons/twitter.svg"
import instagram_black from "../assets/icons/instagram_black.svg"

export default function SocialMediaBox() {
    return (
        <div className="flex gap-3 md:gap-6 lg:gap-8">
            <a href="#"><img src={facebook} alt="fcb" className="size-4 md:size-5" /></a>
            <a href="#"><img src={twitter} alt="twt" className="size-4 md:size-5" /></a>
            <a href="#"><img src={instagram_black} alt="ig" className="size-4 md:size-5" /></a>
        </div>
    )
}