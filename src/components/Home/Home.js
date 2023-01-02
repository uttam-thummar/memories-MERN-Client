import React, { useEffect, useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import { getPostsBySearch } from '../../actions/posts';
import { Alert } from '@material-ui/lab';
import { CLEAR_POST_MESSAGE } from '../../constants/actionTypes';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const { isAlert, alertMessage, alertType } = useSelector(store => store.posts);
    useEffect(() => {
        if (isAlert) {
            setTimeout(() => {
                dispatch({ type: CLEAR_POST_MESSAGE });
            }, 2000);
        }
    }, [isAlert, dispatch]);

    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }
    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                {isAlert && <Alert severity={alertType} className={classes.alert}>{alertMessage}</Alert>}
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAddChip}
                                onDelete={handleDeleteChip}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
