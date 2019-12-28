import React, { useState, FunctionComponent } from 'react';
import { DialogContent, Typography, Avatar, Box } from '@material-ui/core';
import { Position } from './types';
import Card from '../Card';
import Dialog from '../Dialog';

interface Props {
    party: string;
    positions: Position[];
    lastPolitics: string;
    currentPolitics: string;
}

const Title: FunctionComponent<{ name: string }> = ({ name }) => (
    <Box ml={2} mb={1} display="flex" alignItems="center">
        <Box
            width="8px"
            height="24px"
            mr={1}
            borderRadius="4px"
            bgcolor="primary.main"
        />
        <Typography variant="h2">{name}</Typography>
    </Box>
);

const PositionCard: FunctionComponent<Position> = ({ name, position }) => (
    <Box flexBasis="50%" display="flex" alignItems="center">
        <Box mx={1} my={2}>
            <Avatar>{name.charAt(0)}</Avatar>
        </Box>
        <Box flexGrow="1">
            <Typography variant="body2" color="textSecondary">
                {position}
            </Typography>
            <Box>{name}</Box>
        </Box>
    </Box>
);

const FullCard: FunctionComponent = ({ children }) => (
    <Box py={2} px={1} mb={2} display="flex" flexWrap="wrap" bgcolor="white">
        {children}
    </Box>
);

const PreviousParty = ({ party }: { party: string }) => (
    <Box ml="auto">
        <Typography color="textSecondary" variant="body2">
            {party}
        </Typography>
    </Box>
);

const PoliticsCard: FunctionComponent<{
    party?: string;
    num: number;
    title: string;
    politics: string;
}> = ({ party, num, title, politics }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Title name="政見" />
            <Box p={1} onClick={() => setOpen(true)}>
                <Card>
                    <Box mb={1}>
                        <Typography variant="body2" color="textSecondary">
                            {`第 ${num} 屆 不分區立委選舉`}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={0.5}>
                        <Typography> {title}</Typography>
                        {party === '綠黨' && (
                            <PreviousParty party="綠黨與社會民主黨聯盟" />
                        )}
                    </Box>
                    <Box color="rgba(0, 0, 0, 0.54);" height="120px">
                        {`${politics.substring(0, 100)}...`}
                    </Box>
                </Card>
            </Box>
            {open && (
                <Dialog top={title} handleCloseClick={() => setOpen(false)}>
                    <DialogContent>
                        <Box pb="72px">{politics}</Box>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

const BasicInfoTab: FunctionComponent<Props> = ({
    party = '',
    lastPolitics = '',
    currentPolitics = '',
    positions
}) => {
    return (
        <Box width="100vw" bgcolor="#F7F7F7" py={3}>
            <Title name="政黨主要職位" />
            <FullCard>
                {positions.map(p => (
                    <PositionCard {...p} />
                ))}
            </FullCard>
            {currentPolitics && (
                <PoliticsCard
                    num={11}
                    title="本屆參選政見"
                    politics={currentPolitics}
                />
            )}
            {lastPolitics && (
                <PoliticsCard
                    num={10}
                    title="上屆參選政見"
                    politics={lastPolitics}
                    party={party}
                />
            )}
        </Box>
    );
};

export default BasicInfoTab;
