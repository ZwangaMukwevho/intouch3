import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { planContext } from "logic/context/planContext";
import plans from "@config/plans.json";
import menu from "@config/menu.json";

export default function SelectLabels() {
  const { plansMap } = plans;
  const { footer } = menu;
  console.log("plansMap");
  console.log(footer);
  const [plan, setPlan] = useState(planContext);

  const handleChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-helper-label">Plan</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={plan}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* {plansMap.map((planItem, index) => {
            <MenuItem value={10}>planItem.text</MenuItem>;
          })} */}
          <MenuItem value={10}>Basic</MenuItem>
          <MenuItem value={20}>Professional</MenuItem>
          <MenuItem value={30}>Business</MenuItem>
        </Select>
        <FormHelperText>check pricing page to see plan details</FormHelperText>
      </FormControl>
    </div>
  );
}
