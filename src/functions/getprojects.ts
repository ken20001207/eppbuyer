import { Project } from "../classes/Project";
import { UpdateProject } from "../redux/projects/actions";
import store from "../store";

/** 透過 Token 向伺服器換取該用戶的 Projects 。 */
export default function getprojects() {
    return new Promise((resolve, reject) => {
        fetch("/getprojects/index.php", {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
            },
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((res) => {
                    const resdata = (res as unknown) as GetProjectsResponseType;
                    resdata.projects.map((p) => {
                        store.dispatch(UpdateProject(new Project(p)));
                        return null;
                    });
                    resolve();
                });
            } else reject("獲取專案清單失敗，請聯繫客服人員 (" + res.status + ")");
        });
    });
}

export interface GetProjectsResponseType {
    projects: Array<Project>;
}
