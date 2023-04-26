import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButton01(props) {
  return (
    <FormControl style={{ display: "flex" }}>
      <FormLabel id="demo-row-radio-buttons-group-label">성별</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={true} control={<Radio />} label="여성" />
        <FormControlLabel value={false} control={<Radio />} label="남성" />
      </RadioGroup>
    </FormControl>
  );
}
