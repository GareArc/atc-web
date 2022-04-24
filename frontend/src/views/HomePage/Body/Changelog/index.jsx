import "./github.css";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { getChangelogHtml, getChangelogRaw } from "../../../../api/requests/github";

export const ChangeLog = () => {
  const [ghChangelog, setGhChangelog] = useState(null);

  useEffect(() => {
    getChangelogRaw().then(txt => {
      getChangelogHtml(txt).then(html => {
        setGhChangelog(html);
      });
    }).catch(err => console.log(err));
  }, [])

  return (
    <Box
      sx={{
        mt: '10%'
      }}
    >
      {ghChangelog === null ? <div>Loading Changelogs ...</div> : <div dangerouslySetInnerHTML={{ __html: ghChangelog }}></div>}
    </Box>
  )
}