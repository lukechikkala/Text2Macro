/*
    ┌─────────────────────────────────────────────────────────────────────────────┐
    │    Author: Luke Chikkala                                                    │
    │    Converts Text content into a gMA3 Macro.                                 │
    └─────────────────────────────────────────────────────────────────────────────┘
*/
module.exports                  = function( str ) {
    var NewText                 = str;

    const new_lines             = /\n/g;
    const double_quotes         = /\"/g;
    const single_quotes         = /\'/g;
    const line_beginnings       = /^/;
    const line_endings          = /$/;
    const carriage_returns      = /\r/g;

//--[ counters ]--------------------------------------------------------------------------------------------------------------------------------------

    var find_new_lines          = str.match( new_lines );
    var count_new_lines         = find_new_lines ? find_new_lines.length + 1 : 0;

    var find_line_beginnings    = str.match( line_beginnings );
    var line_beginnings_count   = find_line_beginnings ? find_line_beginnings.length : 0;

    var find_line_endings       = str.match( line_endings );
    var line_endings_count      = find_line_endings ? find_line_endings.length : 0;

    var find_double_quotes      = str.match( double_quotes );
    var double_quotes_count     = find_double_quotes ? find_double_quotes.length + 1 : 0;

    var find_single_quotes      = str.match( single_quotes );
    var single_quotes_count     = find_single_quotes ? find_single_quotes.length + 1 : 0;

//--[ regexers ]--------------------------------------------------------------------------------------------------------------------------------------

    if ( count_new_lines == 0 )
    {
        for ( var i = 0 ; i < double_quotes_count ; i++ )
        {
            NewText = NewText.replace( "\"", "\&quot;" );
        }
    
        for ( var i = 0 ; i < single_quotes_count ; i++ )
        {
            NewText = NewText.replace( "\'", "\&apos;" );
        }
        NewText = NewText.replace( line_beginnings, "\n" );
        NewText = NewText.replace( new_lines, "\t\t<MacroLine Command=\"" )
        NewText = NewText.replace( carriage_returns, "\" />\n" );
        NewText = NewText.replace( line_endings, "\" />" );
    }
    else
    {
        for ( var i = 0 ; i < double_quotes_count ; i++ )
        {
            NewText = NewText.replace( "\"", "\&quot;" );
        }
    
        for ( var i = 0 ; i < single_quotes_count ; i++ )
        {
            NewText = NewText.replace( "\'", "\&apos;" );
        }
    
        NewText = NewText.replace( line_beginnings, "\n" );
    
        for ( var i = 0 ; i < count_new_lines ; i++ )
        {
            NewText = NewText.replace( new_lines, "\t\t<MacroLine Command=\"" )
        }
    
        NewText = NewText.replace( carriage_returns, "\" />\n" );
        NewText = NewText.replace( line_endings, "\" />" );
    }

//--[ Headers & Footers ]-----------------------------------------------------------------------------------------------------------------------------

    var gMA3_XML_Header = `<?xml version="1.0" encoding="UTF-8"?>
<GMA3 DataVersion="1.9.3.3">
    <Macro >
`;

    var gMA3_XML_Footer = `
\t</Macro>
</GMA3>
`;

    var gMA3_Macro = gMA3_XML_Header + NewText + gMA3_XML_Footer

    return gMA3_Macro ;

//------------------------------------------------------------------------------------------------------------------------------------------------
/*  ┌─────────────────────────────────────────────────────────────────────────────┐
    │     Code for testing purposes                                               │
    └─────────────────────────────────────────────────────────────────────────────┘ */
//------------------------------------------------------------------------------------------------------------------------------------------------

    // return NewText
    // // + "\n\n"
    // // + "\ncount_new_lines            : " + count_new_lines
    // // + "\nline_beginnings_count      : " + line_beginnings_count
    // // + "\nline_endings_count         : " + line_endings_count
    // // + "\ndouble_quotes_count        : " + double_quotes_count
    // // + "\nsingle_quotes_count        : " + single_quotes_count

    // // + "\ncount_new_lines_now        : " + count_new_lines_now
    // // + "\nline_endings_count_now     : " + line_endings_count_now
    // // + "\ncarriage_returns_count_now : " + carriage_returns_count_now
    // ;
};