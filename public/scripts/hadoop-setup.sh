#!/bin/bash

# Signal handling for graceful exit
cleanup_and_exit() {
    echo
    echo -e "${RED}${ERROR} Installation interrupted by user${NC}"
    echo -e "${YELLOW}⚠️  Setup was cancelled. You may need to run the script again.${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    exit 130
}

# Trap interrupt signals (Ctrl+C, Ctrl+Z, etc.)
trap cleanup_and_exit SIGINT SIGTERM

# Colors and formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Unicode symbols
CHECK_MARK="✅"
WARNING="⚠️ "
ROCKET="🚀"
ERROR="❌"
GEAR="⚙️ "
KEY="🔑"
PACKAGE="📦"
TARGET="🎯"
SPARKLES="✨"

# Function to print styled headers
print_header() {
    local text="$1"
    local text_length=${#text}
    local box_width=66
    local padding=$(( (box_width - text_length) / 2 ))
    local right_padding=$(( box_width - text_length - padding ))
    
    echo
    echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
    printf "${BOLD}${CYAN}║${WHITE}%*s%s%*s${CYAN}║${NC}\n" $padding "" "$text" $right_padding ""
    echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo
}

# Function to print step headers
print_step() {
    echo
    echo -e "${BOLD}${BLUE}╭─ $1${NC}"
    echo -e "${CYAN}│${NC}"
}

# Function for success messages
success() {
    echo -e "${CYAN}│${NC} ${GREEN}${CHECK_MARK} $1${NC}"
}

# Function for warning messages  
warning() {
    echo -e "${CYAN}│${NC} ${YELLOW}${WARNING}$1${NC}"
}

# Function for error messages
error() {
    echo -e "${CYAN}│${NC} ${RED}${ERROR} $1${NC}"
}

# Function for info messages
info() {
    echo -e "${CYAN}│${NC} ${BLUE}${ROCKET} $1${NC}"
}

# Function to close step
close_step() {
    echo -e "${CYAN}╰─────────────────────────────────────────────────────────────────╯${NC}"
}

# Function for progress indicator with better visuals
show_progress() {
    local pid=$!
    local delay=0.15
    local spinstr='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    echo -ne "${CYAN}│${NC} ${BLUE}${GEAR}Processing... ${NC}"
    while kill -0 $pid 2>/dev/null; do
        local temp=${spinstr#?}
        printf "${BLUE}%s${NC}" "${spinstr:0:1}"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b"
    done
    wait $pid
    local exit_code=$?
    if [ $exit_code -eq 0 ]; then
        printf " ${GREEN}Done!${NC}\n"
    else
        printf " ${RED}Failed!${NC}\n"
        return $exit_code
    fi
}

# ASCII Art Header
print_ascii_header() {
    echo -e "${BOLD}${PURPLE}"
    cat << "EOF"
    ╔════════════════════════════════════════════════════════════════╗
    ║  ██╗  ██╗ █████╗ ██████╗  ██████╗  ██████╗ ██████╗             ║
    ║  ██║  ██║██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██╔══██╗            ║
    ║  ███████║███████║██║  ██║██║   ██║██║   ██║██████╔╝            ║
    ║  ██╔══██║██╔══██║██║  ██║██║   ██║██║   ██║██╔═══╝             ║
    ║  ██║  ██║██║  ██║██████╔╝╚██████╔╝╚██████╔╝██║                 ║
    ║  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝ ╚═╝                 ║
    ║                                                                ║
    ║          🚀 Setup Script for macOS (2025) ✨                   ║
    ║                                                                ║
    ║          👨‍💻 Author: Mohit Paddhariya | mohitp.me               ║
    ╚════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    echo
}

# Main script starts here
clear
print_ascii_header
print_header "HADOOP INSTALLATION & CONFIGURATION"

# User confirmation
echo -e "${BOLD}${YELLOW}⚠️  This script will install and configure Hadoop on your macOS system.${NC}"
echo -e "${WHITE}   It will modify system settings and install packages via Homebrew.${NC}"
echo
echo -e "${BOLD}${CYAN}Do you want to continue? ${WHITE}[y/N]${NC}: \c"
read -r user_input

if [[ ! "$user_input" =~ ^[Yy]$ ]]; then
    echo
    echo -e "${YELLOW}⚠️  Installation cancelled by user.${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
    exit 0
fi

echo
echo -e "${GREEN}${CHECK_MARK} Starting Hadoop installation...${NC}"
echo

# 1. Check Homebrew
print_step "Checking Homebrew Installation"
if ! command -v brew &> /dev/null; then
    error "Homebrew is not installed."
    echo -e "${CYAN}│${NC} ${YELLOW}Please install Homebrew first:${NC}"
    echo -e "${CYAN}│${NC} ${BLUE}https://www.youtube.com/watch?v=IWJKRmFLn-g${NC}"
    close_step
    exit 1
fi
success "Homebrew is installed and ready!"
close_step

# 2. Check Java 11
print_step "Verifying Java 11 Installation"
if /usr/libexec/java_home -V 2>/dev/null | grep -q "11."; then
    success "Java 11 detected and configured!"
else
    warning "Java 11 not found in system. Checking Homebrew..."
    if brew list | grep -q "openjdk@11"; then
        success "OpenJDK 11 is already installed via Homebrew!"
    else
        info "Installing OpenJDK 11..."
        (brew install openjdk@11) &
        show_progress
        exit_code=$?
        if [ $exit_code -eq 0 ]; then
            success "OpenJDK 11 installed successfully!"
        else
            error "Failed to install OpenJDK 11"
            close_step
            exit 1
        fi
    fi
fi

# Set JAVA_HOME
JAVA_HOME_PATH=$(/usr/libexec/java_home -v 11 2>/dev/null || echo "/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home")
if [ -z "$JAVA_HOME_PATH" ]; then
    error "Failed to detect Java 11 installation path."
    close_step
    exit 1
fi
echo -e "${CYAN}│${NC} ${CYAN}JAVA_HOME configured: ${WHITE}$JAVA_HOME_PATH${NC}"
close_step

# 3. Check Hadoop installation
print_step "Installing Hadoop Framework"
if brew list hadoop &> /dev/null; then
    success "Hadoop is already installed!"
    INSTALL_HADOOP=false
else
    info "Installing Hadoop via Homebrew..."
    (brew install hadoop) &
    show_progress
    exit_code=$?
    if [ $exit_code -eq 0 ]; then
        success "Hadoop installed successfully!"
        INSTALL_HADOOP=true
    else
        error "Hadoop installation failed"
        close_step
        exit 1
    fi
fi
close_step

# 4. Get Hadoop configuration
HADOOP_VERSION=$(brew list --versions hadoop | awk '{print $2}')
HADOOP_CONF_DIR="/opt/homebrew/Cellar/hadoop/${HADOOP_VERSION}/libexec/etc/hadoop"
if [ ! -d "$HADOOP_CONF_DIR" ]; then
    print_step "Configuration Error"
    error "Hadoop config directory not found."
    close_step
    exit 1
fi

# 5. Configure Hadoop
print_step "Configuring Hadoop Services"
echo -e "${CYAN}│${NC} ${GEAR}Updating configuration files in: ${WHITE}$HADOOP_CONF_DIR${NC}"

# Configure hadoop-env.sh
sed -i.bak '' "s|^export JAVA_HOME=.*|export JAVA_HOME=${JAVA_HOME_PATH}|" "$HADOOP_CONF_DIR/hadoop-env.sh"

# Create configuration files with better formatting
echo -e "${CYAN}│${NC} ${CYAN}  • Creating core-site.xml...${NC}"
cat > "$HADOOP_CONF_DIR/core-site.xml" <<EOF
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://localhost:9000</value>
  </property>
</configuration>
EOF

echo -e "${CYAN}│${NC} ${CYAN}  • Creating hdfs-site.xml...${NC}"
cat > "$HADOOP_CONF_DIR/hdfs-site.xml" <<EOF
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
</configuration>
EOF

echo -e "${CYAN}│${NC} ${CYAN}  • Creating mapred-site.xml...${NC}"
cat > "$HADOOP_CONF_DIR/mapred-site.xml" <<EOF
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
  <property>
    <name>mapreduce.application.classpath</name>
    <value>\$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/*:\$HADOOP_MAPRED_HOME/share/hadoop/mapreduce/lib/*</value>
  </property>
</configuration>
EOF

echo -e "${CYAN}│${NC} ${CYAN}  • Creating yarn-site.xml...${NC}"
cat > "$HADOOP_CONF_DIR/yarn-site.xml" <<EOF
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.nodemanager.env-whitelist</name>
    <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
  </property>
</configuration>
EOF

success "Hadoop configuration files updated successfully!"
close_step

# 6. SSH Configuration
print_step "Configuring SSH Access"
echo -e "${CYAN}│${NC} ${KEY}Checking Remote Login status..."

REMOTE_STATUS=$(systemsetup -getremotelogin 2>/dev/null)
if echo "$REMOTE_STATUS" | grep -q "On"; then
    success "Remote Login is already enabled!"
else
    info "Enabling Remote Login..."
    sudo systemsetup -setremotelogin on
    success "Remote Login enabled!"
fi

# Generate SSH keys
if [ ! -f ~/.ssh/id_rsa ]; then
    info "Generating SSH key pair..."
    ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
    success "SSH key pair generated!"
else
    success "SSH key pair already exists!"
fi

# Configure authorized_keys
mkdir -p ~/.ssh
touch ~/.ssh/authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
success "SSH keys configured for passwordless access!"
close_step

# 7. Format NameNode
print_step "Preparing Hadoop Filesystem"
if [ "$INSTALL_HADOOP" = true ]; then
    info "Formatting NameNode (first-time setup)..."
    (hadoop namenode -format -force -nonInteractive) &
    show_progress
    exit_code=$?
    if [ $exit_code -eq 0 ]; then
        success "NameNode formatted successfully!"
    else
        error "NameNode formatting failed"
        close_step
        exit 1
    fi
else
    warning "Skipping NameNode format (Hadoop was already installed)"
fi
close_step

# 8. Start services
print_step "Starting Hadoop Services"
info "Initializing all Hadoop daemons..."
(start-all.sh) &
show_progress
exit_code=$?
if [ $exit_code -eq 0 ]; then
    success "All Hadoop services started successfully!"
else
    error "Failed to start Hadoop services"
    close_step
    exit 1
fi
close_step

# Final status
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${WHITE}🎯 HADOOP SETUP COMPLETED SUCCESSFULLY! 🎯${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"

echo -e "${BOLD}${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${GREEN}║            🎉 Your Hadoop cluster is now running! 🎉          ║${NC}"
echo -e "${BOLD}${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "${BOLD}${CYAN}📌 Quick Access URLs:${NC}"
echo -e "${WHITE}   🌐 Hadoop Web UI:        ${BLUE}http://localhost:9870${NC}"
echo -e "${WHITE}   📊 YARN Resource Manager: ${BLUE}http://localhost:8088${NC}"
echo
echo -e "${BOLD}${CYAN}🛠️  Useful Commands:${NC}"
echo -e "${WHITE}   🔍 Check running processes: ${YELLOW}jps${NC}"
echo -e "${WHITE}   ⛔ Stop all services:      ${RED}stop-all.sh${NC}"
echo -e "${WHITE}   🔄 Start all services:     ${GREEN}start-all.sh${NC}"
echo

echo -e "${BOLD}${PURPLE}${SPARKLES} Happy Hadooping! ${SPARKLES}${NC}"
echo
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${WHITE}👨‍💻 Author: ${BOLD}Mohit Paddhariya${NC} | 🌐 Visit: ${BLUE}mohitp.me${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════════${NC}"