import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IsSkeleton from "./IsSkeleton";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
const InfoCard = ({ 
  movie,
  loading,
  handleMovieDetail,
  handleWatchLater,
  isWatchLater,
  dontShowDetail
}) => {
  return (
    <>
      <Card key={movie.id} sx={{ maxWidth: 345 }}>
        <IsSkeleton loading={loading} variant="rectangular" width={345} height={500}>
          {movie.poster_path ?
            <CardMedia
            component="img"
            alt="green iguana"
            width={345}
            height={500}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          :
          <CardMedia
            component="img"
            alt="green iguana"
            width={345}
            height={500}
            image="https://via.placeholder.com/500x750"
          />
          }
        </IsSkeleton>
        <CardContent>
          <IsSkeleton loading={loading} variant="text" width={250} height={50}>
            <Typography gutterBottom variant="h5" component="div">
              {
                movie.title || movie.name
              }
            </Typography>
          </IsSkeleton>
          <IsSkeleton loading={loading} variant="text" width={300} height={100}>
            <Typography variant="body2" color="text.secondary">
              {movie.overview.slice(0, 100)}... (Read More)
            </Typography>
          </IsSkeleton>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'space-between' }} >
          <IsSkeleton loading={loading} variant="rounded" width={70} height={30}>
            {!dontShowDetail &&
              <Button 
              size="small"
              onClick={() => handleMovieDetail(movie.id)}
            >Learn More
            </Button>
            }
          </IsSkeleton>
          <IsSkeleton loading={loading} variant="circular" width={40} height={40}>
            {isWatchLater && (
              <BookmarkOutlinedIcon 
                onClick={() => handleWatchLater(movie.id)}
                color={isWatchLater(movie.id) ? 'error' : 'disabled'}
              />
            )}
          </IsSkeleton>
        </CardActions>
      </Card>
    </>
  );
};

export default InfoCard;
