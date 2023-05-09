import { post, get } from "../axios";

/** Get RAW markdown file of Changelog.md from Github.
 * 
 * @returns {Promise<string>} raw text of Changelog.md.
 */
export const getChangelogRaw = async () => {
    return get("https://raw.githubusercontent.com/GareArc/atc-web/dev/Changelogs.md");
}

/**
 * 
 * @param {string} txt 
 * @returns {Promise<string>}
 */
export const getChangelogHtml = async (txt) => {
    const config = {
        headers: { "Accept": "application/vnd.github.v3+json"}
    }
    const data = {
        text: txt
    };
    return post("https://api.github.com/markdown", data, config);
}

