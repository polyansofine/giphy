import '../assets/searchBox.css'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import searchApi from '../api/searchApi';
import randomApi from '../api/randomApi';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import {useNavigate} from 'react-router-dom'

import DataContext from '../context/context'
import { useContext } from 'react';

function SearchBox(){
      const navigate = useNavigate();
      const {dataText, setDataText, dataCollection, setDataCollection} = useContext(DataContext);
      // const itemData = [
      //       {
      //             img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      //             title: 'Breakfast',
      //       },{
      //             img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      //             title: 'Breakfast',
      //       },{
      //             img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      //             title: 'Breakfast',
      //       },{
      //             img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      //             title: 'Breakfast',
      //       },{
      //             img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      //             title: 'Breakfast',
      //       }
      //     ];
      const [randomImageColletion, setRandomImageCollection] = useState({});
      const [searchCollection, setSearchCollection] = useState([]);
      const [searchText, setSearchText] = useState('');
      const [status, setStatus] = useState(false);

      const handleSearching = (e) => {
            e.preventDefault();
            setSearchText(e.target.value);
            if(e.target.value.length >= 2){
                  searchApi(e.target.value).then(res => setSearchCollection(res.data));
                  setStatus(true);
                  console.log(searchCollection)
            }else{
                  setStatus(false)
            }
      }
      useEffect(() =>{
            randomApi().then(data => setRandomImageCollection(data));
            setSearchText(dataText);
            setSearchCollection(dataCollection);
            if(dataText === ''){
                  setStatus(false)
            }else{
                  setStatus(true);
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      useEffect(()=>{
                  setInterval(() => {
                        randomApi().then(data => setRandomImageCollection(data));
                  }, 10000);
      },[]);

      const gotoShowGif=(selectTitle, selectUrl, realUrl)=>{

            setDataText(searchText);
            setDataCollection(searchCollection);
            navigate('/showgif', { state: { title: selectTitle, url: selectUrl, realUrl: realUrl } });
      }
      return(
            <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  sx={{p:3}}
                  spacing={2}
            >
                  <Grid item container>
                        <TextField
                              id="input-with-icon-textfield"
                              InputProps={{
                              startAdornment: (
                                    <InputAdornment position="start">
                                          <SearchIcon />
                                    </InputAdornment>
                              ),
                              }}
                              sx={{ outline:'none', border:'none', width: status ? '70%' :'100%'}}
                              onChange={handleSearching}
                              focused
                              variant="outlined"
                              color="secondary"
                              value={searchText}
                              type="search"
                        />
                        {status && <Button onClick={()=>{setSearchText(''); setStatus(false)}} color="secondary" sx={{width:'30%'}}>Cancel</Button>}
                  </Grid>
                  <Grid item>
                        {!status ? <p>Random selected Gif:</p>  : <p>Search results:</p>}
                  </Grid>
                  <Grid item container>
                  <ImageList sx={{margin:'auto', width: '100%', maxHeight:'400px'}} cols={status ? 3 : 1} >
                        {status && (searchCollection.map((item, index) => (
                        <ImageListItem key={index} sx={{m:0, p:0}}>
                        
                        <img
                              src={item.images.fixed_height_small_still.url}
                              alt={item.title}
                              loading="lazy"
                              style={{
                                    margin:'auto',
                                    width: '100%',
                                    maxHeight: '400px',
                                    maxWidth:'400px'
                              }}
                              onClick={() => gotoShowGif(item.title, item.images.fixed_height.url, item.url)}
                        />
                        </ImageListItem>
                        )))}
                        {!status && 
                        <ImageListItem sx={{m:0, p:0}}>
                        <img
                              src={randomImageColletion.url}
                              loading="lazy"
                              alt="one"
                              style={{
                                    margin:'auto',
                                    width: '90%',
                                    maxHeight: '400px',
                                    maxWidth:'400px'
                              }}
                        />
                        </ImageListItem>}
                  </ImageList>
                  </Grid>
                  {!status && <Grid item container justifyContent="space-between">
                        <Grid item xs={9} sx={{overflow:'hidden'}}>
                              <h5 style={{padding:'0',margin:'0'}}>{randomImageColletion.title ? randomImageColletion.title : 'No Title available'}</h5>
                              <h6 style={{padding:'0',margin:'0'}}>{randomImageColletion.realUrl} </h6>
                        </Grid>
                        <Grid item xs={3} >
                              <Avatar sx={{p:1, width: 30, height: 30,ml:'auto' }}> +16
                              </Avatar>
                        </Grid>
                        
                  </Grid>}
            </Grid>
      );
}

export default SearchBox;