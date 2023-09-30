import { Page } from "../../components";
import "./NotFound.style.scss";

function NotFound () {
    return (
        <Page>
            <div className="not-found-page">
                <h2>Error 404: Page not found!</h2>
                <img src="https://media.tenor.com/3V_0YWiTYrQAAAAd/anime-cat.gif" alt="Page not found" />
            </div>
        </Page>
    );
}

export default NotFound;