import '../assets/showGif.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import Avatar from '@mui/material/Avatar';
import { useLocation, useNavigate } from 'react-router-dom'

function SearchBox(){
      const { state } = useLocation();
      const { title, url, realUrl } = state;
      const navigate = useNavigate();
      const prevPage = ()=>{
            navigate('/');
      }
      return(
            <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  sx={{p:5}}
                  spacing={4}
            >
                  <Grid item container justifyContent="center" sx={{textAlign:'center'}}>
                        <Grid item>
                              <IconButton onClick={prevPage} size="small" color="secondary" aria-label="add an alarm" sx={{position: 'absolute', left:'10px  '}}>
                                    <ArrowBackIosSharpIcon size="small"/>
                              </IconButton>
                        </Grid>
                        <Grid item> <span className="title">{title ? title : "No title available"}</span></Grid>
                       
                  </Grid>
                  <Grid item container>
                  <ImageList sx={{ width: '100%', maxHeight:'400px',m:0 }} cols={1} >
                        <ImageListItem sx={{m:0, p:0}}>
                              <img
                                    src={url}
                                    alt="one"
                                    loading="lazy"
                                    style={{
                                          margin:'auto',
                                          width: '100%',
                                          maxHeight: '400px',
                                          maxWidth:'400px'
                                    }}
                              />
                        </ImageListItem>
                  </ImageList>
                  </Grid>
                  <Grid item container justifyContent="space-between">
                        <Grid item xs={9} sx={{overflow:'hidden'}}>
                              <h5 style={{padding:'0',margin:'0'}}>{title ? title : 'No Title available'}</h5>
                              <h6 style={{padding:'0',margin:'0'}}>{realUrl} </h6>
                        </Grid>
                        <Grid item xs={3} >
                              <Avatar sx={{p:1, width: 30, height: 30,ml:'auto' }}> +16
                              </Avatar>
                        </Grid>
                  </Grid>
            </Grid>
      );
}

export default SearchBox;