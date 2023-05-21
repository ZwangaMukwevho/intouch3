import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { PlanContext } from "logic/context/planContext";
import plans from "@config/plans.json";

export default function SelectLabels() {
  const { subscriptions } = plans;
  const { plan, setPlan } = useContext(PlanContext);

  const handleChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-required-label">Plan *</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={plan}
          label="Plan *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subscriptions.map((sub, _) => {
            return <MenuItem value={sub.text}>{sub.text}</MenuItem>;
          })}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
}
