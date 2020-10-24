import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const date = today.toISOString().split("T")[0];
function EditRenter() {
    return (
        <div>
            <Container maxWidth="md" >
				<h1 align="center">แก้ไขข้อมูลผู้เช่า</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} >
						<TextField required id="standard-basic" label="รหัสผู้เช่า" />
                        <Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SearchIcon />}
						></Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField  id="standard-basic" label="ชื่อผูู้เช่า" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							
							id="standard-basic"
							label="นามสกุลผู้เช่า"
						/>
					</Grid>
                    
					<Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="บ้านเลขที่"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="หมู่"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="ถนน"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="แขวง/ตำบล"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="เขต/อำเภอ"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="จังหวัด"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="รหัสไปรษณีย์"
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							
                            id="standard-basic"
							label="เบอร์โทร"
						/>
					</Grid>

					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</Container>
        </div>
    )
}

export default EditRenter
