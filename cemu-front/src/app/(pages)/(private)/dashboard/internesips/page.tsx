import { Box, Chip, Stack, Typography } from "@mui/material";
import { CustomSearchBar } from "../../../../components/TextField/CumstomSearchBar";
import SitesTable from "../../../../components/Table/SitesTable";
import { ClientButton } from "@/app/components/Buttons/ClientButton";
import Dialog from "@/app/components/Modal/GlobalModal";
import { Creation } from "@/app/components/Modal/Creation";
import { getInternship } from "@/app/actions/internships/getInternships";

export default async function SitesPage() {
  const allSites = await getInternship(1);

  const limit = 10;
  const offset = 0;
  const paginatedSites = allSites.slice(offset, offset + limit);

  return (
    <Box sx={{ mt: 7, minHeight: "80vh" }}>
      <Typography
        sx={{
          mb: 2,
          fontFamily: "Sans-serif",
          fontWeight: 600,
          fontSize: "22px",
        }}
      >
        Gologin
      </Typography>

      <Box sx={{ bgcolor: "#FFF", width: "100%", borderRadius: "4px" }}>
        <Stack>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px",
              pb: "10px",
            }}
          >
            <CustomSearchBar query={""} setQuery={() => {}} label={"Buscar"} />
            <ClientButton
              label={"Crear"}
              variant={"text"}
              modal={
                <Dialog
                  open={false}
                  onClose={() => {}}
                  title={"Crear un sitio"}
                  content={<Creation />}
                  SecondTitle="Roles"
                  SecondaryContent={
                    <Box sx={{ padding: "16px 0" }}>
                      <Stack
                        sx={{
                          width: "100%",
                          gap: "0.875rem",
                          flexDirection: "row",
                        }}
                      >
                        <Chip label="UNEAT" />
                        <Chip label="FUNIBER" />
                      </Stack>
                    </Box>
                  }
                  DialogConfirmation={"Confirmar"}
                  DialogCancel={"Cancelar"}
                />
              }
            />
          </Stack>
          <Box sx={{ p: "24px" }}>
            <SitesTable
              projects={paginatedSites}
              total={allSites.length}
              limit={limit}
              currentOffset={offset}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
