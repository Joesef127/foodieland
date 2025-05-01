import facebook from "../assets/icons/facebook.png"
import twitter from "../assets/icons/twitter.png"
import instagram_black from "../assets/icons/instagram_black.png"

export default function SocialMediaBox() {
    return (
        <div className="flex gap-8">
            <a href="#"><img src={facebook} alt="fcb" /></a>
            <a href="#"><img src={twitter} alt="twt" /></a>
            <a href="#"><img src={instagram_black} alt="ig" /></a>
        </div>
    )
}