"use client"
import React, { useEffect, useState } from "react";
import { getMovie, getRecommendations } from "@/app/api";
import { useParams } from "next/navigation";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import InfoCard from "@/components/InfoCard";
import { useRouter } from "next/navigation";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
const ContentDetail = ({type}) => {
    const [content, setContent] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const { id } = useParams();
    const router = useRouter();

    const handleContentDetail = (id) => {
        router.push(`/${type}/${id}`)
    }

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await getMovie(type, id);
                setContent(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const fetchRec = await getRecommendations(type, id);
                setRecommendations(fetchRec);
                console.log(fetchRec);
            } catch (error) {
                console.error(error);
            }
        }
        fetchContentData();
        fetchRecommendations();

    }, [id]);

    if (!content) return <div>Loading...</div>;

    return (
        <div style={{
            margin: "3rem auto",
            width: "80%",
        }} >
            <div style={{
                display: "flex",
                gap: "1rem",
            }} >
                {content.poster_path ?
                    <img style={
                        { width: "30%", borderRadius: "10px" }
                    } src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`} alt={content.title} />
                    : <img style={
                        { width: "30%", borderRadius: "10px" }
                    }
                        src="https://via.placeholder.com/500x750" alt="placeholder" />}
                <div className="">
                    <Stack sx={
                        { width: "80%", }
                    } spacing={2}>
                        <h1>{content.title || content.name}</h1>
                        <p>{content.tagline}</p>
                        <p>{content.overview}</p>
                        <Stack direction="row" spacing={1}>
                            <Chip label={content.release_date || content.last_air_date} variant="outlined" />
                            <Chip label={content.vote_average.toFixed(1)} />
                        </Stack>
                    </Stack>
                </div>
            </div>
            {recommendations.length > 0 &&
                <Stack sx={{ marginY: "3em" }} spacing={2} className="">
                    <h2>Recommendations</h2>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", }} >
                        {recommendations?.map((item) => (
                            <InfoCard
                                key={item.id}
                                movie={item}
                                handleMovieDetail={handleContentDetail}
                            />
                        ))}
                    </div>
                </Stack>
            }
        </div>
    );
};

export default ContentDetail;
