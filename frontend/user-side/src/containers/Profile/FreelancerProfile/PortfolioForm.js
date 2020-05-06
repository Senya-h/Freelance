import React, {useState, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import {useFormik} from 'formik';
import axios, {baseURL, maxFileSize} from '../../../axios';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import mime from 'mime-types';
import Popover from '@material-ui/core/Popover';
import Loader from 'react-loader-spinner';

import {object as yupObject, string as yupString} from 'yup';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(3)
        }
    }
}))


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

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            localFile: '',
            formFile: '',
        },
        validateOnChange: false,
        validateOnBlur: false, 
        validationSchema: yupObject({
            title: yupString().required("Privalomas laukelis"),
            description: yupString().required("Privalomas laukelis"),
            formFile: yupString().required("Įkelkite portfolio failą")
        }),
        onSubmit: values => {
            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            console.log(values);
            formData.append('filePath', values.formFile);

            props.setUploading(true);

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
                    const newWork = res.data;
                    newWork.clientApprove = {
                        approve: 0,
                        clientName: ''
                    };
                    props.setWorks([...props.works, res.data]);
                    props.setUploading(false);
                    props.handleClose();
                }
            })
        }
    })

    const setFile = (e) => {
        formik.setFieldTouched('formFile');

        if(e.target.files[0]) {
            if(formats.map(format => format.fileType).includes(e.target.files[0].type)) {
                if(e.target.files[0].size > maxFileSize) {
                    formik.setFieldValue('localFile', '');
                    formik.setFieldValue('formFile', '');
                    formik.setFieldError('formFile', "Failas per didelis");
                } else {
                    formik.setFieldValue('localFile', {
                        file: e.target.files[0],
                        link: URL.createObjectURL(e.target.files[0])
                    });
                    formik.setFieldValue('formFile', e.currentTarget.files[0]);
                    formik.setFieldError('formFile', '');
                }
            } else {
                formik.setFieldValue('localFile', '');
                formik.setFieldValue('formFile', '');
                formik.setFieldError('formFile', "Nepalaikomas failo formatas");
            }
            
        }
    }

    let portfolioDisplayMode = null;
    if(formik.values.localFile) {
        switch(formik.values.localFile.file.type.split('/')[0]) {
            case "video":
                portfolioDisplayMode = (
                    <ReactPlayer url={formik.values.localFile.link} width="300px" height="auto"/>
                )
                break;
            case "image":
                portfolioDisplayMode = (
                    <img style={{width: '300px', marginBottom:'15px'}} src={formik.values.localFile.link} alt="portfolio" />
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
            <form onSubmit={formik.handleSubmit} autoComplete='off' encType='multipart/form-data'>
                <DialogContent className={classes.root} dividers>
                    <div>
                        <TextField fullWidth label="Pavadinimas" variant='outlined' {...formik.getFieldProps('title')} />
                        {formik.touched.description && formik.errors.title ? (
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

                        {formik.errors.formFile ? (
                            <div className='text-danger'>{formik.errors.formFile}</div>
                            ) : null}
                        <div>
                            <input
                                type="file"
                                style={{display: 'none'}}
                                id="inputFormFile"
                                name="formFile" onChange={setFile}
                            />
                            <label htmlFor="inputFormFile">
                                <Button variant='contained' component='span' color='primary'>
                                    {formik.values.localFile? "Keisti failą": "Pridėti failą"}
                                </Button>
                            </label>
                            <Button type="button" color='primary' onClick={openPopover}>Tinkami formatai</Button>
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
                                        <li key={format.id} style={{display: 'inline-block', listStyle: 'none', marginRight: '5px', marginLeft: '5px'}}>{format.format}</li>
                                    ))}
                                </ul>
                            </Popover>
                        </div>

                        <p>Maksimalus failo dydis: 50 MB</p>
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