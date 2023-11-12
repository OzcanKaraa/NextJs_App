"use client"
import React from "react";
import { getTrendMovies } from "@/app/api";
import { useEffect, useState } from 'react';
import InfoCard from "./InfoCard";
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { Typography, Stack } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const TrendContent = ({type}) => {
    const router = useRouter();
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [watchLaters, setWatchLaters] = useState([]);
    const [search, setSearch] = useState('');

    const filteredContent = content.filter((content)=> {
        const title = content.title || content.name
        return title.toLowerCase().includes(search.toLowerCase())
    })

    const FetchTrendContent = async () => {
        setLoading(true)
        getTrendMovies(type)
            .then((response) => {
                setContent(response)
            })
            .catch((error) => {
                setError(error.message || 'Something went wrong')
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
    }
    useEffect(() => {
        FetchTrendContent()

        const storedWatch = JSON.parse(localStorage.getItem('watchLaters'))
        if (storedWatch) {
            setWatchLaters(storedWatch)
        }
    }, [type])

    const handleContentDetail = (id) => {
        router.push(`/${type}/${id}`)
    }

    const handleWatchLater = (id) => {
        const newWatchLaters = watchLaters.includes(id)
            ? watchLaters.filter((movieId) => movieId !== id)
            : [...watchLaters, id];

        setWatchLaters(newWatchLaters);
        localStorage.setItem('watchLaters', JSON.stringify(newWatchLaters))
    }

    const isWatchLater = (id) => watchLaters.includes(id)

    return (
        <Box sx={{ width: 1, margin: "20 auto", padding: "1em 5em" }}>
            <Typography sx={{ paddingBottom: 2 }} variant="h5">
                Trend {type === "movie" ? "Movies" : "TV Shows"} Weekly
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Search>
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                {content &&
                    filteredContent?.map((item) => (
                        <Box gridColumn="span 4">
                            <InfoCard
                                key={item.id}
                                movie={item}
                                loading={loading}
                                isWatchLater={isWatchLater}
                                handleWatchLater={handleWatchLater}
                                handleMovieDetail={handleContentDetail}
                                dontShowDetail={false}
                            />
                        </Box>
                ))
                }
            </Box>
        </Box>
    );
};

export default TrendContent;
