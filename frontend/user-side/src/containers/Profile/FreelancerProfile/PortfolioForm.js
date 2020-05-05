import React, {useState, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import {useFormik} from 'formik';
import axios, {baseURL} from '../../../axios';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import mime from 'mime-types';
import Popover from '@material-ui/core/Popover';

import {object as yupObject, string as yupString} from 'yup';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    }
}))

const PORTFOLIO_TYPES = {
    GRAPHIC: {
        name: "GRAPHIC"
    },
    TEXT: {
        name: "TEXT"
    },
    VIDEO: {
        name: "VIDEO"
    },
};

const PortfolioForm = (props) => {
    const classes = useStyles();
    const [formats, setFormats] = useState([]);

    useEffect(() => {
        axios.get('/format-list')
            .then(res => {
                setFormats(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const toEdit = props.portfolioToEdit? true: false;

    const formik = useFormik({
        initialValues: {
            title: toEdit? props.portfolioToEdit.title: '',
            description: toEdit? props.portfolioToEdit.description: '',
            localFile: toEdit? props.portfolioToEdit.filePath: '',
            formFile: toEdit? props.portfolioToEdit.filePath: '',
        },
        validationSchema: yupObject({
            title: yupString().required("Privalomas laukelis"),
            description: yupString().required("Privalomas laukelis"),
            formFile: yupString().required("Įkelkite nuotrauką")
        }),
        onSubmit: values => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            console.log(values);
            let prevImage = null;
            if(toEdit) {
                prevImage = props.portfolioToEdit.filePath;
            }

            if(values.formFile !== prevImage) {
                console.log("Pridedam nauja")
                formData.append('filePath', values.formFile);

            }

            if(toEdit) {
                axios.post('/update/work&id=' + props.portfolioToEdit.id, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    console.log(res);
                    if(!res.data.error) {
                        const updatedPortfolio = props.works.map(work => {
                            if(work.id === props.portfolioToEdit.id) {
                                work.title = res.data.title;
                                work.description = res.data.description;
                                work.filePath = res.data.filePath;
                            }
                            return work;
                        })

                        props.setWorks(updatedPortfolio);
                        props.handleClose();
                    }
                })
            } else {
                axios.post('/work', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + props.token,
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    console.log(res);
                    if(!res.data.error) {
                        
                        console.log("Darbas pridetas", res)
                        props.setWorks([...props.works, res.data]);
                        props.handleClose();
                    }
                })
            }
        }
    })

    let shownImagePath = null;
    if(toEdit) {
        if(props.portfolioToEdit.filePath) {
            shownImagePath = props.portfolioToEdit.filePath;
        }
    }

    const setFile = (e) => {
        if(e.target.files[0]) {
            if(formats.map(format => format.fileType).includes(e.target.files[0].type)) {
                formik.setFieldValue('localFile', {
                    file: e.target.files[0],
                    link: URL.createObjectURL(e.target.files[0])
                });
                formik.setFieldValue('formFile', e.currentTarget.files[0]);
                console.log("Tinka");

            } else {
                console.log("Netinka");
                // formik.setErrors('formFile', "Netinkamas failo formatas")
                // formik.setFieldError('formFile', "Netinkamas failo formatas")
            }
        }
    }

    let portfolioDisplayMode = null;
    if(formik.values.localFile) {
        console.log(formik.values.localFile);
        switch(formik.values.localFile.file.type.split('/')[0]) {
            case "video":
                portfolioDisplayMode = (
                    <ReactPlayer url={formik.values.localFile.link} controls width="300px" height="auto"/>
                )
                break;
            case "image":
                portfolioDisplayMode = (
                    <img style={{width: '300px', marginBottom:'15px'}} src={formik.values.localFile.link === shownImagePath? `${baseURL}/storage/${shownImagePath}`: formik.values.localFile.link} alt="portfolio" />
                )
                break;
            case "application":
                portfolioDisplayMode = (
                    <img style={{width: '50px', display: 'inline', marginBottom:'15px'}} src={`${baseURL}/storage/portfolioWorks/textFile.png`} alt={props.title}/>
                )
                break;
            default:
                break;
        }
    }


    const [anchorEl, setAnchorEl] = useState(null);

    const openPopover = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <Button color='primary' onClick={openPopover}>Tinkami formatai</Button>
            <Popover
                open={anchorEl? true: false}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ul style={{paddingLeft: 0}}>
                    {formats.map(format => (
                        <li key={format.id} style={{display: 'inline-block', listStyle: 'none', marginRight: '5px', marginLeft: '5px'}} key={format.id}>{format.format}</li>
                    ))}
                </ul>
            </Popover>
            <p>Maksimalus failo dydis: XXX MB</p>
            <form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
                <DialogContent className={classes.root} >
                    <div>
                        <TextField fullWidth label="Pavadinimas" variant='outlined' {...formik.getFieldProps('title')} />
                        {formik.touched.title && formik.errors.title ? (
                        <div className='text-danger'>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div>
                        <TextField fullWidth label="Aprašymas" multiline rows={3} variant='outlined' {...formik.getFieldProps('description')} />
                        {formik.touched.description && formik.errors.description ? (
                        <div className='text-danger'>{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <Box display="flex" alignItems="end" flexDirection="column">
                        {formik.values.localFile?
                        <>
                            {portfolioDisplayMode}
                            <p>{formik.values.localFile.file.name} - { Math.round(((formik.values.localFile.file.size / 1000000) + Number.EPSILON) * 100) / 100} MB</p>
                        </>
                        :
                        null}
                        

                        {formik.touched.formFile && formik.errors.formFile ? (
                            <div className='text-danger'>{formik.errors.formFile}</div>
                            ) : null}    
                        <Button variant='contained' component='label' color='primary'>
                            {formik.values.localFile? "Keisti failą": "Pridėti failą"}
                            <input type='file' style={{display: 'none'}} name="file" onChange={setFile}/>
                        </Button>
 
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" type='button' onClick={props.handleClose}>
                        Atšaukti
                    </Button>
                    <Button color="primary" type='submit'>
                        Patvirtinti
                    </Button>
                </DialogActions>
            </form>
        </div>
    )
};

export default PortfolioForm;