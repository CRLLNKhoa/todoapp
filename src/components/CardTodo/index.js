import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import BrushIcon from "@mui/icons-material/Brush";

export default function SimpleAccordion({ category, complete, time, todo }) {
  return (
    <div>
      <Accordion
        className={complete === 0 ? "card-todo" : "card-todo complete"}
        sx={{ margin: "10px 0", backgroundColor: "#292e3c" }}
      >
        <AccordionSummary
          sx={{ width: "100%", display: "flex" }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <>
            {(category === "design" && (
              <button className="design-icon">
                <BrushIcon />
              </button>
            )) ||
              (category === "food" && (
                <button className="food-icon">
                  <FastfoodIcon />
                </button>
              )) ||
              (category === "work" && (
                <button className="work-icon">
                  <WorkIcon />
                </button>
              )) ||
              (category === "workout" && (
                <button className="workout-icon">
                  <FitnessCenterIcon />
                </button>
              )) ||
              (category === "alarm" && (
                <button className="alarm-icon">
                  <AccessAlarmIcon />
                </button>
              )) || (
                <button className="design-icon">
                  <WorkIcon />
                </button>
              )}
            <Typography
              alignItems="center"
              marginLeft="10px"
              className="title-todo"
            >
              {todo}
            </Typography>
          </>
          <Typography variant="span" component="span" className="time">
            {`${time}:00`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
