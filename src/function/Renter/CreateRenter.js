import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";



function CreateRoom() {
	return (
		<div>
			<Container maxWidth="md" >
				<h1 align="center">เพิ่มข้อมูลผู้เช่า</h1>
				<Grid container spacing={3}>
					<Grid item xs={12} >
						<TextField required id="standard-basic" label="รหัสผู้เช่า" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField required id="standard-basic" label="ชื่อผูู้เช่า" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id="standard-basic"
							label="นามสกุลผู้เช่า"
						/>
					</Grid>
                    
					<Grid item xs={12}>
						<TextField
							id="standard-full-width"
							label="ที่อยู่ผู้เช่า"
							multiline
							rowsMax={4}
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
                    <Grid item xs={12} sm={6}>
						<TextField
							required
                            id="standard-basic"
							label="เบอร์โทร"
						/>
					</Grid>

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
	);
}

export default CreateRoom;
