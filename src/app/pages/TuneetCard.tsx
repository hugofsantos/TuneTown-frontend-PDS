import { ContainerPosts } from "../components/profile/ContainerPosts";
import { Card } from "../components/posts/Card";
import { useAuth } from "../../infra/contexts/auth/UseAuth";
import { ProfileMenu } from "../components/profile/ProfileMenu";
import { useEffect, useRef, useState } from "react";
import { findTuneetsByUserId } from "../services/auth/findTuneetsByUserId";
import { PageMetadados, Tuneet, TuneetResponse } from "@/domain/types/Post";
import { findTuneetById } from "../services/auth/findTuneetById";
import { useParams } from "react-router-dom";
import { findTunetsInfos } from "../services/auth/findInfoTuneet";
import { makeAComment } from "../services/auth/makeAComment";
import { findTunetsComments } from "../services/auth/findTunetsComments";
import { TbTrash } from "react-icons/tb";

type Comment = {
    id: string;
    tuneetId: string;
    authorId: string;
    contentText: string;
    createdAt: string;
};

export const TuneetCard = () => {
    const { user, profile } = useAuth();
    const [tuneet, setTuneet] = useState<Tuneet | null>(null);
    const [contentText, setContentText] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<any>([]);

    const { tuneetId } = useParams();

    useEffect(() => {
        if (tuneetId) {
            fetchTuneet(tuneetId);
        }
    }, [tuneetId]);

    async function fetchTuneet(tuneetId: string | null) {
        if (!tuneetId) return;
        const tuneet = await findTuneetById(tuneetId);
        const comments = await findTunetsComments(tuneetId);
        const response = await findTunetsInfos(tuneetId);
        setTuneet(tuneet || null);
        setLikes(response?.content || []);
        setComments(comments.content || []);
    }



    async function commentTuneet() {
        const comment = await makeAComment(tuneetId!, profile!.id, contentText);
        setComments([...comments, comment]);
        setContentText("");
    }

    return (
        <div className="w-full h-full items-center p-4">
            <div className="h-full md:max-w-2xl w-full rounded-lg border-box relative border-r-[1px] 
       border-stroke overflow-hidden flex flex-col items-center overflow-y-auto">
                <Card
                    author={tuneet?.author.username || ""}
                    authorImg={tuneet?.author.profile.photo.url || ""}
                    content={tuneet?.textContent || ""}
                    track={tuneet} />

                <div className="w-full  p-4 max-w-2xl mt-6  bg-fume rounded-lg border border-stroke flex flex-col gap-3">
                    <h3 className="font-bold text-lg text-theme">Comentários</h3>

                    <div className="flex  flex-1 flex-col gap-4 ">

                        {comments.length === 0 ? (
                            <p className="text-sm text-contrast/70">Nenhum comentário ainda.</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="flex flex-col gap-4 bg-black/10 rounded p-2">



                                    <span className="text-xs flex justify-between text-theme font-bold"><p>@{comment.authorId}</p>
                                        <p>{new Date(comment?.createdAt).toLocaleString()}</p></span>
                                    <span className="text-xs text-contrast/50 flex justify-between"> {comment.contentText}</span>
                                    <span className="flex justify-end">{
                                        profile?.id === comment.authorId && (
                                            <TbTrash className=" right-2 text-slate-300 top-2 cursor-pointer text-contrast/50 hover:text-red-500"
                                            />
                                        )
                                    }</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={contentText}
                            onChange={(e) => setContentText(e.target.value)}
                            placeholder="Escreva um comentário..."
                            className="flex-1 rounded-lg border border-stroke px-3 py-2 text-sm bg-transparent text-contrast focus:outline-none"
                        />
                        <button
                            onClick={commentTuneet}
                            className="px-4 py-2 rounded-lg bg-theme text-white text-sm hover:bg-green-800 transition"
                        >
                            Comentar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
